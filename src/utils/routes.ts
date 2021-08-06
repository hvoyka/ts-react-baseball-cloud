export const ROUTES = {
  ROOT: "/",
  PROFILE: "/profile",
  PROFILE_ID: (id = ":id"): string => `/profile/${id}`,
  LEADERBOARD: "/leaderboard",
  NETWORK: "/network",
  LOGIN: "/login",
  REGISTRATION: "/registration",
  FORGOT_PASSWORD: "/forgot-password",
};
