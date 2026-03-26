647:    <script>
648-        const params = new URLSearchParams(window.location.search);
649-        const tierLimits = { 'Free': 14, 'Starter': 150, 'Pro': 300, 'Elite': 600 };
650-        const rawTier = params.get('tier') || 'Free';
651-        let initialTier = 'Free';
652-        if (rawTier.toLowerCase().includes('elite')) initialTier = 'Elite';
653-        else if (rawTier.toLowerCase().includes('pro')) initialTier = 'Pro';
654-        else if (rawTier.toLowerCase().includes('starter')) initialTier = 'Starter';
655-
656-        let userStats = { tier: initialTier, dailyLimit: tierLimits[initialTier] || 14, usage: { voice: 0, bio: 0, hook: 0, plan: 0, multiplier: 0 } };
657-
658-        window.addEventListener('message', (event) => {
659-            const allowedOrigins = ["https://www.freespiritmarketer.com", "https://freespiritmarketer.com", "https://gmajors1326.wixsite.com"];
660-            
661-            // DEBUG: See every message coming in
662-            console.log("Dashboard received raw message:", event.data, "from origin:", event.origin);
663-
664-            if (!allowedOrigins.includes(event.origin) && !event.origin.endsWith(".wix.com")) {
665-                console.warn("Message origin blocked or not recognized:", event.origin);
666-                // We'll proceed for now if it's a dev environment, but log it
667-            }
668-
669-            if (event.data.type === 'USER_DATA' || event.data.type === 'SYNC_PLAN') {
670-                console.log("Processing Data from Wix:", event.data);
671-                const incomingTier = (event.data.tier || "Free").toLowerCase();
672-                let detectedTier = "Free";
673-                if (incomingTier.includes('elite')) detectedTier = 'Elite';
674-                else if (incomingTier.includes('pro')) detectedTier = 'Pro';
675-                else if (incomingTier.includes('starter')) detectedTier = 'Starter';
676-
677-                // If the URL suggests a higher tier than the DB (e.g., just purchased, webhook delay),
678-                // trust the URL tier for this session to avoid frustrating the user.
679-                if (tierLimits[initialTier] > tierLimits[detectedTier]) {
680-                    console.log(`URL tier (${initialTier}) is higher than DB tier (${detectedTier}). Trusting URL tier for this session.`);
681-                    detectedTier = initialTier;
682-                }
683-
684-                console.log("Detected Tier:", detectedTier);
685-                userStats.tier = detectedTier;
686-                userStats.dailyLimit = tierLimits[detectedTier] || 14;
687-                if (event.data.usage) {
688-                    // Handle both usage object and flat usage number for backward compatibility during sync
689-                    if (typeof event.data.usage === 'object') {
690-                        userStats.usage = event.data.usage;
691-                    } else if (typeof event.data.usage === 'number') {
692-                        // Distribute the flat usage if it's a number (fallback)
693-                        const perTool = Math.floor(event.data.usage / 5);
694-                        userStats.usage = { voice: perTool, bio: perTool, hook: perTool, plan: perTool, multiplier: event.data.usage - (perTool * 4) };
695-                    }
696-                }
697-                updateEnergyMeter();
698-                updateTierRestrictions();
699-            }
700-        });
701-
702-        function updateTierRestrictions() {
703-            const kitTitle = document.getElementById('tier-kit-title');
704-            if (kitTitle) kitTitle.innerText = `The Content Companion ${userStats.tier} Kit`;
705-        }
706-
707-        function updateEnergyMeter(type) {
708-            const types = type ? [type] : ['voice', 'bio', 'hook', 'plan', 'multiplier'];
709-            types.forEach(t => {
710-                const section = document.getElementById(t === 'voice' ? 'find-your-voice' : t === 'bio' ? 'bio-builder' : t === 'hook' ? 'find-your-hook' : t === 'plan' ? 'content-planner' : t === 'multiplier' ? 'the-multiplier' : 'help-support');
711-                if (!section) return;
712-                const display = section.querySelector('#runs-display');
713-                if (!display) return;
714-                const used = userStats.usage[t] || 0;
715-                const remaining = userStats.dailyLimit - used;
716-                display.innerText = `${remaining < 0 ? 0 : remaining}/${userStats.dailyLimit} Runs Left`;
717-                
718-                const btn = section.querySelector('.btn-generate');
719-                if (btn) {
720-                    if (remaining <= 0) {
721-                        btn.innerHTML = `Upgrade to Generate More ✨`;
722-                        btn.classList.add('disabled-nudge');
723-                        btn.onclick = goToUpgrade;
724-                    } else {
725-                        btn.classList.remove('disabled-nudge');
726-                        btn.innerHTML = t === 'voice' ? 'Analyze My Voice' : t === 'bio' ? 'Generate Bio' : t === 'hook' ? 'Create Hook' : t === 'plan' ? 'Plan My Week' : 'Multiply My Idea';
727-                        btn.onclick = () => runTool(t);
728-                    }
729-                }
730-            });
731-        }
732-
733-        async function runTool(type) {
734-            const resultDiv = document.getElementById(`${type}-result`);
735-            const used = userStats.usage[type] || 0;
736-            if (used >= userStats.dailyLimit) { goToUpgrade(); return; }
737-
738-            const section = document.getElementById(type === 'voice' ? 'find-your-voice' : type === 'bio' ? 'bio-builder' : type === 'hook' ? 'find-your-hook' : type === 'plan' ? 'content-planner' : 'the-multiplier');
739-            const btn = section.querySelector('.btn-generate');
740-            const originalText = btn.innerText;
741-
742-            resultDiv.innerHTML = "Gathering insights... ✨";
743-            btn.disabled = true;
744-            btn.innerHTML = `Thinking... <span class="spinner-icon">↻</span>`;
745-
746-            let payload = { tier: userStats.tier };
747-            let endpoint = `/api/tools/generate-${type}`;
748-            if (type === 'voice') { payload.userInput = document.getElementById('voice-sample').value; endpoint = '/api/tools/analyze-voice'; }
749-            else if (type === 'bio') payload.userInput = document.getElementById('bio-input').value;
750-            else if (type === 'hook') payload.idea = document.getElementById('hook-topic').value;
751-            else if (type === 'plan') { payload.themeInput = document.getElementById('plan-theme').value; endpoint = '/api/tools/plan-weekly'; }
752-            else if (type === 'multiplier') payload.userInput = document.getElementById('multiplier-input').value;
753-
754-            try {
755-                const response = await fetch(endpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
756-                const result = await response.json();
757-
758-                if (!result.success) {
759-                    throw new Error(result.error || "Server error");
760-                }
761-
762-                userStats.usage[type]++;
763-                updateEnergyMeter(type);
764-                
765-                const targetOrigin = window.location.origin.includes('freespiritmarketer') ? "https://www.freespiritmarketer.com" : "*";
766-                window.parent.postMessage({ type: 'UPDATE_USAGE', newCount: Object.values(userStats.usage).reduce((a,b)=>a+b,0), toolType: type, toolUsedCount: userStats.usage[type] }, targetOrigin);
767-
768-                const data = result.data;
769-                if (type === 'multiplier') {
770-                    resultDiv.innerHTML = `
771-                        <div style="margin-bottom: 15px;"><strong>🌿 Educational / How-To:</strong><br>${data.educational_asset}</div>
772-                        <div style="margin-bottom: 15px;"><strong>🌿 Emotional / Story:</strong><br>${data.emotional_asset}</div>
773-                        <div style="margin-bottom: 15px;"><strong>🌿 Contrarian / Challenge:</strong><br>${data.contrarian_asset}</div>
774-                    `;
775-                } else if (type === 'voice') {
776-                    resultDiv.innerHTML = `
777-                        <div style="margin-bottom: 15px;"><strong>✨ Your Voice DNA:</strong><br>${data.your_voice_dna}</div>
778-                        <div style="margin-bottom: 15px;"><strong>✨ Signature Patterns:</strong><br>${data.signature_patterns}</div>
779-                        <div style="margin-bottom: 15px;"><strong>✨ The Filter:</strong><br>${data.the_filter}</div>
780-                        <div style="margin-bottom: 15px;"><strong>✨ Voice Sample:</strong><br>${data.voice_sample}</div>
781-                    `;
782-                } else if (type === 'hook') {
783-                    resultDiv.innerHTML = `
784-                        <div style="margin-bottom: 15px;"><strong>🪝 The Negative Hook:</strong><br>${data.the_negative}</div>
785-                        <div style="margin-bottom: 15px;"><strong>🪝 The Curiosity Gap:</strong><br>${data.the_curiosity}</div>
786-                        <div style="margin-bottom: 15px;"><strong>🪝 The Authority Shift:</strong><br>${data.the_authority}</div>
787-                    `;
788-                } else if (type === 'plan') {
789-                    resultDiv.innerHTML = `
790-                        <div style="margin-bottom: 15px;"><strong>📅 Post 1 (The Hook):</strong><br>${data.the_hook_post}</div>
791-                        <div style="margin-bottom: 15px;"><strong>📅 Post 2 (The Value):</strong><br>${data.the_value_post}</div>
792-                        <div style="margin-bottom: 15px;"><strong>📅 Post 3 (The Bridge):</strong><br>${data.the_bridge_post}</div>
793-                    `;
794-                } else if (type === 'bio') {
795-                    resultDiv.innerHTML = `
796-                        <div style="white-space: pre-line;"><strong>✨ Your New Bio:</strong><br>${data.insta_bio}</div>
797-                    `;
