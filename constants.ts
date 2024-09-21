export const BASE_API_URL =
    process.env.NEXT_PUBLIC_NODE_ENV === "development"
        ? "http://localhost:4000"
        : "https://sync-app-420807.uc.r.appspot.com";
