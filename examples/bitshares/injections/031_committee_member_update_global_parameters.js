import { injection } from '../../lib/injection.js'

let run = async function () { 
  await injection(
    "InjectExample.031", // script name
    "BTS_TEST", // chain
    "wss://testnet.xbts.io/ws", // wss url
    "committee_member_update_global_parameters", // operation name
    {
      new_parameters: {
        current_fees: {
          parameters: [
            {
              "operation": {
                fee: 1,
                price_per_kbyte: 1
              }
              // all other operation types & their associated fees
            }
          ],
          scale: 1
        },
        block_interval: 0,
        maintenance_interval: 0,
        maintenance_skip_slots: 0,
        committee_proposal_review_period: 0,
        maximum_transaction_size: 0,
        maximum_block_size: 0,
        maximum_time_until_expiration: 0,
        maximum_proposal_lifetime: 0,
        maximum_asset_whitelist_authorities: 0,
        maximum_asset_feed_publishers: 0,
        maximum_witness_count: 0,
        maximum_committee_count: 0,
        maximum_authority_membership: 0,
        reserve_percent_of_fee: 0,
        network_percent_of_fee: 0,
        lifetime_referrer_percent_of_fee: 0,
        cashback_vesting_period_seconds: 0,
        cashback_vesting_threshold: 0,
        count_non_member_votes: false,
        allow_non_member_whitelists: true,
        witness_pay_per_block: 1,
        worker_budget_per_day: 0,
        max_predicate_opcode: 0,
        fee_liquidation_threshold: 0,
        accounts_per_fee_scale: 0,
        account_fee_scale_bitshifts: 0,
        max_authority_depth: 0,
        extensions: []
      }
    }
  );
}

run();
