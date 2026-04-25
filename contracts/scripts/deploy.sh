#!/usr/bin/env bash
set -euo pipefail

: "${SOROBAN_RPC_URL:?Set SOROBAN_RPC_URL}"
: "${SOROBAN_NETWORK_PASSPHRASE:?Set SOROBAN_NETWORK_PASSPHRASE}"
: "${SOROBAN_SECRET_KEY:?Set SOROBAN_SECRET_KEY}"

soroban contract build --package task_rewards_contract
soroban contract deploy \
  --wasm target/wasm32-unknown-unknown/release/task_rewards_contract.wasm \
  --source alice \
  --rpc-url "$SOROBAN_RPC_URL" \
  --network-passphrase "$SOROBAN_NETWORK_PASSPHRASE"
