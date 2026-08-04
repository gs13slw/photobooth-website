// ⚠️ Edit this to match your client's real deposit policy.
export const DEPOSIT_PERCENT = 50;

export function calculateDeposit(estimate: number) {
  const deposit = Math.round((estimate * DEPOSIT_PERCENT) / 100);
  return { deposit, balance: estimate - deposit };
}
