        const params = new URLSearchParams(window.location.search);
        const tierLimits = { 'Free': 14, 'Starter': 150, 'Pro': 300, 'Elite': 600 };
        const rawTier = params.get('tier') || 'Free';
        let initialTier = 'Free';
        if (rawTier.toLowerCase().includes('elite')) initialTier = 'Elite';
        else if (rawTier.toLowerCase().includes('pro')) initialTier = 'Pro';
        else if (rawTier.toLowerCase().includes('starter')) initialTier = 'Starter';

        let userStats = { tier: initialTier, dailyLimit: tierLimits[initialTier] || 14, usage: { voice: 0, bio: 0, hook: 0, plan: 0, multiplier: 0 } };

        // Update UI immediately with initial tier from URL
        updateTierRestrictions();
        updateEnergyMeter();

        window.addEventListener('message', (event) => {
            const allowedOrigins = ["https://www.freespiritmarketer.com", "https://freespiritmarketer.com", "https://gmajors1326.wixsite.com"];
            
            // DEBUG: See every message coming in
            console.log("Dashboard received raw message:", event.data, "from origin:", event.origin);

            if (!allowedOrigins.includes(event.origin) && !event.origin.endsWith(".wix.com")) {
                console.warn("Message origin blocked or not recognized:", event.origin);
                // We'll proceed for now if it's a dev environment, but log it
            }

            if (event.data.type === 'USER_DATA' || event.data.type === 'SYNC_PLAN') {
                console.log("Processing Data from Wix:", event.data);
                
                // Robust tier detection: check multiple fields Wix might send
                const rawIncoming = event.data.tier || event.data.planName || event.data.plan || "Free";
                const incomingTier = String(rawIncoming).toLowerCase();

                let detectedTier = "Free";
                if (incomingTier.includes('elite')) detectedTier = 'Elite';
                else if (incomingTier.includes('pro')) detectedTier = 'Pro';
                else if (incomingTier.includes('starter')) detectedTier = 'Starter';

                // If the URL suggests a higher tier than the DB (e.g., just purchased, webhook delay),
                // trust the URL tier for this session to avoid frustrating the user.
                if (tierLimits[initialTier] > tierLimits[detectedTier]) {
                    console.log(`URL tier (${initialTier}) is higher than DB tier (${detectedTier}). Trusting URL tier for this session.`);
                    detectedTier = initialTier;
                }

                console.log("Detected Tier:", detectedTier);
                userStats.tier = detectedTier;
                userStats.dailyLimit = tierLimits[detectedTier] || 14;
                if (event.data.usage) {
                    // Handle both usage object and flat usage number for backward compatibility during sync
                    if (typeof event.data.usage === 'object') {
                        userStats.usage = event.data.usage;
                    } else if (typeof event.data.usage === 'number') {
                        // Distribute the flat usage if it's a number (fallback)
                        const perTool = Math.floor(event.data.usage / 5);
                        userStats.usage = { voice: perTool, bio: perTool, hook: perTool, plan: perTool, multiplier: event.data.usage - (perTool * 4) };
                    }
                }
                updateEnergyMeter();
                updateTierRestrictions();
            }
        });

        function updateTierRestrictions() {
            const kitTitle = document.getElementById('tier-kit-title');
            if (kitTitle) kitTitle.innerText = `The Content Companion ${userStats.tier} Kit`;
        }

        function updateEnergyMeter(type) {
            const types = type ? [type] : ['voice', 'bio', 'hook', 'plan', 'multiplier'];
            types.forEach(t => {
                const section = document.getElementById(t === 'voice' ? 'find-your-voice' : t === 'bio' ? 'bio-builder' : t === 'hook' ? 'find-your-hook' : t === 'plan' ? 'content-planner' : t === 'multiplier' ? 'the-multiplier' : 'help-support');
                if (!section) return;
                const display = section.querySelector('#runs-display');
                if (!display) return;
                const used = userStats.usage[t] || 0;
                const remaining = userStats.dailyLimit - used;
                display.innerText = `${remaining < 0 ? 0 : remaining}/${userStats.dailyLimit} Runs Left`;
                
                const btn = section.querySelector('.btn-generate');
                if (btn) {
                    if (remaining <= 0) {
                        btn.innerHTML = `Upgrade to Generate More ✨`;
                        btn.classList.add('disabled-nudge');
                        btn.onclick = goToUpgrade;
                    } else {
                        btn.classList.remove('disabled-nudge');
                        btn.innerHTML = t === 'voice' ? 'Analyze My Voice' : t === 'bio' ? 'Generate Bio' : t === 'hook' ? 'Create Hook' : t === 'plan' ? 'Plan My Week' : 'Multiply My Idea';
                        btn.onclick = () => runTool(t);
                    }
                }
            });
        }

        async function runTool(type) {
            const resultDiv = document.getElementById(`${type}-result`);
            const used = userStats.usage[type] || 0;
            if (used >= userStats.dailyLimit) { goToUpgrade(); return; }

            const section = document.getElementById(type === 'voice' ? 'find-your-voice' : type === 'bio' ? 'bio-builder' : type === 'hook' ? 'find-your-hook' : type === 'plan' ? 'content-planner' : 'the-multiplier');
            const btn = section.querySelector('.btn-generate');
            const originalText = btn.innerText;

            resultDiv.innerHTML = "Gathering insights... ✨";
            btn.disabled = true;
            btn.innerHTML = `Thinking... <span class="spinner-icon">↻</span>`;

            let payload = { tier: userStats.tier };
            let endpoint = `/api/tools/generate-${type}`;
            if (type === 'voice') { payload.userInput = document.getElementById('voice-sample').value; endpoint = '/api/tools/analyze-voice'; }
            else if (type === 'bio') payload.userInput = document.getElementById('bio-input').value;
            else if (type === 'hook') payload.idea = document.getElementById('hook-topic').value;
            else if (type === 'plan') { payload.themeInput = document.getElementById('plan-theme').value; endpoint = '/api/tools/plan-weekly'; }
            else if (type === 'multiplier') payload.userInput = document.getElementById('multiplier-input').value;

            try {
                const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
                const result = await response.json();

                if (!result.success) {
                    throw new Error(result.error || "Server error");
                }

                userStats.usage[type]++;
                updateEnergyMeter(type);
                
                const targetOrigin = window.location.origin.includes('freespiritmarketer') ? "https://www.freespiritmarketer.com" : "*";
                window.parent.postMessage({ type: 'UPDATE_USAGE', newCount: Object.values(userStats.usage).reduce((a,b)=>a+b,0), toolType: type, toolUsedCount: userStats.usage[type] }, targetOrigin);

                const data = result.data;
                if (type === 'multiplier') {
                    resultDiv.innerHTML = `
                        <div style="margin-bottom: 15px;"><strong>🌿 Educational / How-To:</strong><br>${data.educational_asset}</div>
                        <div style="margin-bottom: 15px;"><strong>🌿 Emotional / Story:</strong><br>${data.emotional_asset}</div>
                        <div style="margin-bottom: 15px;"><strong>🌿 Contrarian / Challenge:</strong><br>${data.contrarian_asset}</div>
                    `;
                } else if (type === 'voice') {
                    resultDiv.innerHTML = `
                        <div style="margin-bottom: 15px;"><strong>✨ Your Voice DNA:</strong><br>${data.your_voice_dna}</div>
                        <div style="margin-bottom: 15px;"><strong>✨ Signature Patterns:</strong><br>${data.signature_patterns}</div>
                        <div style="margin-bottom: 15px;"><strong>✨ The Filter:</strong><br>${data.the_filter}</div>
                        <div style="margin-bottom: 15px;"><strong>✨ Voice Sample:</strong><br>${data.voice_sample}</div>
                    `;
                } else if (type === 'hook') {
                    resultDiv.innerHTML = `
                        <div style="margin-bottom: 15px;"><strong>🪝 The Negative Hook:</strong><br>${data.the_negative}</div>
                        <div style="margin-bottom: 15px;"><strong>🪝 The Curiosity Gap:</strong><br>${data.the_curiosity}</div>
                        <div style="margin-bottom: 15px;"><strong>🪝 The Authority Shift:</strong><br>${data.the_authority}</div>
                    `;
                } else if (type === 'plan') {
                    resultDiv.innerHTML = `
                        <div style="margin-bottom: 15px;"><strong>📅 Post 1 (The Hook):</strong><br>${data.the_hook_post}</div>
                        <div style="margin-bottom: 15px;"><strong>📅 Post 2 (The Value):</strong><br>${data.the_value_post}</div>
                        <div style="margin-bottom: 15px;"><strong>📅 Post 3 (The Bridge):</strong><br>${data.the_bridge_post}</div>
                    `;
                } else if (type === 'bio') {
                    resultDiv.innerHTML = `
                        <div style="white-space: pre-line;"><strong>✨ Your New Bio:</strong><br>${data.insta_bio}</div>
                    `;
                } else {
                    resultDiv.innerText = typeof data === 'string' ? data : JSON.stringify(data, null, 2);
                }
            } catch (error) { 
                console.error("Tool Execution Error:", error);
                resultDiv.innerText = "Error processing request. Please try again. ✨"; 
            } finally { 
                btn.disabled = false; 
                btn.innerHTML = originalText; 
            }
        }

        function goToUpgrade() { window.top.location.href = `https://www.freespiritmarketer.com/pricing-plans?currentTier=${userStats.tier}`; }
        function refreshPlan() {
            const targetOrigin = window.location.origin.includes('freespiritmarketer') ? "https://www.freespiritmarketer.com" : "*";
            window.parent.postMessage({ type: 'REFRESH' }, targetOrigin);
            setTimeout(() => window.parent.postMessage({ type: 'GET_USER_DATA' }, targetOrigin), 500);
        }

        function switchTool(toolId, element) {
            document.querySelectorAll('.tool-card').forEach(card => card.classList.remove('active'));
            document.getElementById(toolId).classList.add('active');

            if (element) {
                document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
                element.classList.add('active');
            }
            document.getElementById('mobile-select').value = toolId;

            const video = document.getElementById('growth-video');
            if (video) {
                video.pause();
                video.currentTime = 0;
                setTimeout(() => { video.play(); }, 50);
            }
        }

        document.addEventListener('DOMContentLoaded', () => {
            const targetOrigin = window.location.origin.includes('freespiritmarketer') ? "https://www.freespiritmarketer.com" : "*";
            window.parent.postMessage({ type: 'READY' }, targetOrigin);
        });
