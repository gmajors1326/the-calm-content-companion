import wixData from 'wix-data';

export async function wixPricingPlans_onPlanPurchased(event) {
    // 1. Get the Member ID and the name of the Plan they just bought
    const memberId = event.order.buyer.memberId;
    const planName = event.order.planName.toLowerCase(); 

    // 2. Figure out which Tier they should get based on the Plan Name
    let newTier = "Free";
    if (planName.includes('elite')) newTier = "Elite";
    else if (planName.includes('pro')) newTier = "Pro";
    else if (planName.includes('starter')) newTier = "Starter";

    try {
        // 3. Find the user in your userUsage database
        let results = await wixData.query("userUsage")
            .eq("_owner", memberId) // This looks for the member's unique ID
            .find({ "suppressAuth": true }); // suppressAuth allows backend to edit the DB

        if (results.items.length > 0) {
            // 4. Update the existing row
            let userRecord = results.items[0];
            userRecord.tier = newTier; // Updates the 'tier' column
            
            await wixData.update("userUsage", userRecord, { "suppressAuth": true });
            console.log(`Successfully upgraded member to ${newTier}!`);
        } else {
            // 5. If they somehow aren't in the database yet, create a row for them
            let newRecord = {
                "_owner": memberId,
                "tier": newTier
            };
            await wixData.insert("userUsage", newRecord, { "suppressAuth": true });
            console.log(`Created new member record on ${newTier} tier!`);
        }
    } catch (error) {
        console.error("Error upgrading user tier:", error);
    }
}
