// Helper function for redirect
const redirect = (url: string, init?: ResponseInit) => {
    return new Response(null, {
        ...init,
        status: 302,
        headers: {
            Location: url,
            ...init?.headers,
        },
    })
}

export async function action() {
    // TODO: Clear session/cookies here
    // For now, just redirect to home page

    return redirect("/", {
        headers: {
            "Set-Cookie": "session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:00 GMT; HttpOnly; Secure; SameSite=Strict"
        }
    })
}

export async function loader() {
    // Redirect GET requests to home
    return redirect("/")
}