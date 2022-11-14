export type LoginResponse = {
  token: string;
  is_verified: boolean;
  expiration_subscription_date?: Date;
};
