import pkg from 'pg';
const { Client } = pkg;

// Use the pooler connection (port 6543) which is accessible externally
const client = new Client({
    connectionString: 'postgresql://postgres.hymqlijolzaimwgfevtp:Sutton62606181202@aws-1-us-east-2.pooler.supabase.com:6543/postgres',
    ssl: { rejectUnauthorized: false },
});

const USER_ID = '577d9bb0-0df6-438c-88bc-395661527091';

async function run() {
    await client.connect();
    console.log('Connected to Supabase DB via pooler');

    // 1. Confirm email in auth.users
    await client.query(`
        UPDATE auth.users 
        SET email_confirmed_at = now(), confirmed_at = now()
        WHERE id = $1
    `, [USER_ID]);
    console.log('✅  Email confirmed');

    // 2. Upsert profile with admin + pro flags
    try {
        await client.query(`
            INSERT INTO public.profiles (id, email, full_name, is_admin, plan)
            VALUES ($1, 'gmajors1326@gmail.com', 'Greg', true, 'pro')
            ON CONFLICT (id) DO UPDATE
            SET is_admin = true, plan = 'pro', full_name = 'Greg'
        `, [USER_ID]);
        console.log('✅  Profile set: admin = true, plan = pro');
    } catch (e) {
        console.warn('⚠️  Profile update skipped (run schema.sql first):', e.message);
    }

    // 3. Verify
    const result = await client.query(
        `SELECT email, email_confirmed_at FROM auth.users WHERE id = $1`, [USER_ID]
    );
    console.log('\nVerification:', result.rows[0]);
    console.log('\n🎉  Done! Sign in at /sign-in with:');
    console.log('   Email:    gmajors1326@gmail.com');
    console.log('   Password: admin123');

    await client.end();
}

run().catch(err => {
    console.error('❌ Error:', err.message);
    process.exit(1);
});
