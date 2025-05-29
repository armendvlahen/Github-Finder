const searchButton = document.getElementById('searchButton');
const usernameInput = document.getElementById('username');

const nameEl = document.getElementById('name');
const usernameDisplay = document.getElementById('usernameDisplay');
const avatar = document.getElementById('avatar');
const bio = document.getElementById('bio');
const locationEl = document.getElementById('location');
const followers = document.getElementById('followers');
const following = document.getElementById('following');
const publicRepos = document.getElementById('publicRepos');
const createdAt = document.getElementById('createdAt');
const updatedAt = document.getElementById('updatedAt');
const profileLink = document.getElementById('profileLink');

const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');
const profile = document.getElementById('profile');

searchButton.addEventListener('click', async () => {
    const username = usernameInput.value.trim();

    if (!username) return;

    errorDiv.style.display = 'none';
    loadingDiv.style.display = 'block';
    profile.style.display = 'none';
try {
        const response = await fetch(`https://api.github.com/users/${username}`);
        if (!response.ok) throw new Error("User not found");

        const data = await response.json();

        nameEl.textContent = data.name || "";
        usernameDisplay.textContent = `@${data.login}`;
        avatar.src = data.avatar_url;
        bio.textContent = `Bio: ${data.bio || "N/A"}`;
        locationEl.textContent = `Location: ${data.location || "N/A"}`;
        followers.textContent = `Followers: ${data.followers}`;
        following.textContent = `Following: ${data.following}`;
        publicRepos.textContent = `Public Repos: ${data.public_repos}`;
        createdAt.textContent = `Created At: ${new Date(data.created_at).toLocaleDateString()}`;
        updatedAt.textContent = `Updated At: ${new Date(data.updated_at).toLocaleDateString()}`;
        profileLink.href = data.html_url;

        profile.style.display = 'block';
    } catch (error) {
        errorDiv.style.display = 'block';
    } finally {
        loadingDiv.style.display = 'none';
    }
});