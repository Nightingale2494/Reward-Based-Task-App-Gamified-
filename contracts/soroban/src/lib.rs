#![no_std]
use soroban_sdk::{contract, contractimpl, contracttype, Address, Env, Symbol};

#[contracttype]
pub enum DataKey {
    Points(Address),
}

#[contract]
pub struct TaskRewardsContract;

#[contractimpl]
impl TaskRewardsContract {
    pub fn add_points(env: Env, user: Address, amount: i128) {
        user.require_auth();
        let key = DataKey::Points(user.clone());
        let current: i128 = env.storage().instance().get(&key).unwrap_or(0);
        env.storage().instance().set(&key, &(current + amount));
    }

    pub fn get_points(env: Env, user: Address) -> i128 {
        let key = DataKey::Points(user);
        env.storage().instance().get(&key).unwrap_or(0)
    }

    pub fn claim_reward(env: Env, user: Address, cost: i128, reward_id: Symbol) -> bool {
        user.require_auth();
        let key = DataKey::Points(user.clone());
        let points: i128 = env.storage().instance().get(&key).unwrap_or(0);
        if points < cost {
            return false;
        }

        env.storage().instance().set(&key, &(points - cost));
        env.events().publish((Symbol::new(&env, "reward_claimed"), user), reward_id);
        true
    }
}
