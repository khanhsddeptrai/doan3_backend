const setPageTitle = (pageTitle) => {
    const pageTitleId = document.getElementById('pageTitle')
    switch (pageTitle) {
        case 'dashboard':
            pageTitleId.innerText = 'Bảng điều khiển'
            break
        case 'patient-manager':
            pageTitleId.innerText = 'Quản lý bệnh nhân'
            break
        case 'account-manager':
            pageTitleId.innerText = 'Quản lý tài khoản'
            break
        case 'doctor-manager':
            pageTitleId.innerText = 'Quản lý bác sĩ'
            break
        case 'specialty-manager':
            pageTitleId.innerText = 'Quản lý chuyên khoa'
            break
        case 'medical-facility-manager':
            pageTitleId.innerText = 'Quản lý cơ sở y tế'
            break
        case 'booking-manager':
            pageTitleId.innerText = 'Quản lý lịch hẹn'
            break
        // case 'appointment-manager':
        //     pageTitleId.innerText = 'Quản lý lịch hẹn'
        //     break
        default:
            return
    }
}

// Hàm xử lý sự kiện hover trên các thẻ nav-link
const handleHoverEffect = () => {
    const elements = document.querySelectorAll('.nav-link')
    elements.forEach(e => {
        e.addEventListener('mouseover', () => {
            e.style.boxShadow = '0 3px 8px 2px rgba(84, 27, 142, .5)'
            e.style.transition = 'box-shadow .1s'
        })
        e.addEventListener('mouseout', () => {
            e.style.boxShadow = ''
        })
    })
}

const setActiveLink = () => {
    const sidebarMenu = document.getElementById('sideBarMenu')
    const navlinks = sidebarMenu.querySelectorAll('.nav-link')

    // Đặt trạng thái active khi trang load lại
    sidebarMenu.addEventListener('click', (event) => {
        const navLink = event.target.closest('.nav-link')

        // Reset tất cả các liên kết
        navlinks.forEach(link => {
            link.classList.remove('active')
            link.classList.add('link-dark')
        })

        // Cập nhật trạng thái active cho navLink
        navLink.classList.add('active')
        navLink.classList.remove('link-dark')

        // Kích hoạt liên kết được chọn
        localStorage.setItem('localStorageActiveLinkID', navLink.id)

        if (!navLink || navLink.classList.contains('exclude-link')) return
        // Ngăn chặn hành vi mặc định và cập nhật nội dung trang
        // event.preventDefault()

        const pageTitle = navLink.getAttribute('page-title')
        const dataTarget = navLink.getAttribute('page-title')

        const newUrl = '/dashboard'
        history.pushState({ pageTitle, dataTarget }, pageTitle, newUrl)

        setPageTitle(pageTitle)
    })
}

// Hàm khôi phục dữ liệu bảng khi tải lại trang
const restoreDataTable = () => {
    const savedDataTarget = localStorage.getItem('activeDataTarget')
    if (savedDataTarget) {
        getDataTable(savedDataTarget)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const allNavLinks = document.querySelectorAll('#sideBarMenu .nav-link')
    allNavLinks.forEach(link => {
        handleHoverEffect(link)
    })

    function setActiveLinkFromLocalStorage(storageKey) {
        const elementId = localStorage.getItem(storageKey);
        if (elementId) {
            const element = document.querySelector(`#${elementId}`);
            if (element) {
                element.classList.add('active');
                element.classList.remove('link-dark');
            }
        }
    }

    setActiveLinkFromLocalStorage('localStorageActiveLinkID');
})

setActiveLink();
handleHoverEffect()