// TMDB API KEY 검증
async function validateApiKey(apiKey) {
    const url = `https://api.themoviedb.org/3/movie/550?api_key=${apiKey}`;
    try {
        const res = await fetch(url);
        return res.ok;
    } catch {
        return false;
    }
}

// 회원가입 로직
export async function registerUser(email, apiKey) {
    const apiKeyValid = await validateApiKey(apiKey);

    if (!apiKeyValid) {
        return { success: false, message: "유효하지 않은 TMDB API KEY 입니다." };
    }

    const user = {
        email,
        apiKey,
    };

    // ⭐ 회원가입은 user 정보만 저장
    localStorage.setItem("user", JSON.stringify(user));

    return { success: true };
}

// 로그인 로직
export async function loginUser(email, apiKey) {
    const stored = localStorage.getItem("user");

    if (!stored) {
        return { success: false, message: "등록된 계정이 없습니다." };
    }

    const user = JSON.parse(stored);

    if (user.email !== email) {
        return { success: false, message: "이메일이 일치하지 않습니다." };
    }

    if (user.apiKey !== apiKey) {
        return { success: false, message: "API KEY가 일치하지 않습니다." };
    }

    const isValid = await validateApiKey(apiKey);
    if (!isValid) {
        return { success: false, message: "유효하지 않은 TMDB API KEY 입니다." };
    }

    // ⭐ 여기서 로그인 상태 저장(중요)
    localStorage.setItem("auth", "true");

    return { success: true };
}





