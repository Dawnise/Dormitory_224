document.addEventListener('DOMContentLoaded', function() {
    const toggleCameraButton = document.getElementById('toggle-camera');
    const backgroundVideo = document.getElementById('background-video');
    let stream;
    let isPasswordCorrect = false;

    // 请求摄像头权限
    async function requestCameraPermission() {
        try {
            stream = await navigator.mediaDevices.getUserMedia({ video: true });
            backgroundVideo.srcObject = stream;
            backgroundVideo.style.display = 'block';
            toggleCameraButton.textContent = '关闭摄像头';
        } catch (error) {
            console.error('摄像头权限被拒绝', error);
            useFallbackBackground();
        }
    }

    // 使用备用背景
    function useFallbackBackground() {
        backgroundVideo.style.display = 'none';
        document.body.style.backgroundImage = "url('dormitory.jpg')";
    }

    // 切换摄像头状态
    toggleCameraButton.addEventListener('click', () => {
        if (toggleCameraButton.textContent === '打开摄像头') {
            requestCameraPermission();
        } else {
            if (stream) {
                stream.getTracks().forEach(track => track.stop());
                backgroundVideo.srcObject = null;
                backgroundVideo.style.display = 'none';
                toggleCameraButton.textContent = '打开摄像头';
            }
        }
    });

    // 页面加载时弹出确认对话框
    if (confirm('是否开启摄像头？Yes maybe')) {
        requestCameraPermission();
    } else {
        useFallbackBackground();
    }

    // 提交密码的逻辑
    document.getElementById('submit-password').addEventListener('click', function() {
        const passwordInput = document.getElementById('password-input');
        const passwordStatus = document.getElementById('password-status');
        if (passwordInput.value === 'chenjz70' || 
            passwordInput.value === 'Chenjz70' || 
            passwordInput.value === 'weakpoint1066' || 
            passwordInput.value === 'a11b45ab14' || 
            passwordInput.value === 'wly72888' || 
            passwordInput.value === 'dawnise')
            {
            isPasswordCorrect = true;
            passwordStatus.textContent = '密码正确，无需再次输入。';
            passwordStatus.style.color = 'green';
        } else {
            isPasswordCorrect = false;
            passwordStatus.textContent = '密码错误，请重新输入。';
            passwordStatus.style.color = 'red';
        }
    });

    // 相片点击跳转的逻辑
    function openWindow(element) {
        const url = element.getAttribute('data-url');
        if (isPasswordCorrect && url) {
            window.open(url, '_blank');
        } else {
            alert('请输入正确的密码。');
        }
    }

    // 给所有图片绑定点击事件
    document.querySelectorAll('.corner-box img').forEach(img => {
        img.addEventListener('click', function() {
            openWindow(this);
        });
    });
});