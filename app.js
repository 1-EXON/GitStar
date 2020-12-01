function main() {
    setTimeout(find, 6000)
}

async function getStar(name) {
    const repos = await fetch(`https://api.github.com/users/${name}/repos`).then(resp => resp.json())
    let stars = 0
    repos.forEach((repo) => stars += repo.stargazers_count)
    return stars
}

function find() {
    try {
        const profiles1 = document.querySelectorAll('#dashboard > div > div > div > div > div > span')
        const profiles2 = document.querySelectorAll('#dashboard > div > div > div > div > div > div > div.d-flex.flex-items-baseline > div > a.link-gray-dark.no-underline.text-bold.wb-break-all.d-inline-block')
        addEventMouseEnter(profiles1)
        addEventMouseEnter(profiles2)
    } catch (err) {
        console.log(err)
    }
}

function addEventMouseEnter(arr) {
    arr.forEach((profile) => {
        profile.addEventListener("mouseenter", () => {
            console.log("enter")
            setTimeout(showStar, 1000)
        })
    })
}

async function showStar() {
    try {
        const userInfo = document.querySelector('body > div.Popover.js-hovercard-content.position-absolute > div > div > div > div.d-flex.mt-3 > div.overflow-hidden.ml-3 > div.mt-1 > div')
        const userName = document.querySelector('body > div.Popover.js-hovercard-content.position-absolute > div > div > div > div.d-flex.mt-3 > div.overflow-hidden.ml-3 > a.link-gray.no-underline.ml-1')
        const stars = await getStar(userName.innerHTML)
        userInfo.innerHTML += '\n<b>⭐: ' + stars + '</b>'
    } catch (err) {
        console.log(err)
    }

}

main()

// body > div.Popover.js-hovercard-content.position-absolute > div > div > div > div.f6.border-bottom.mr-n3.ml-n3.user-status-container