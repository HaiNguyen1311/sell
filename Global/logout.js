function confirmLogout() {
    if (confirm("Bạn có chắc chắn muốn đăng xuất?")) {
        logout();
    }
}
function logout() {
    localStorage.removeItem("token");
    window.location.href = '../index.html'
}
