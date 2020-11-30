function main() {
    setTimeout(get, 6000)
}

async function getStar(name) {
    const repos = await fetch(`https://api.github.com/users/${name}/repos`).then(resp => resp.json())
    let stars = 0
    repos.forEach((repo) => stars += repo.stargazers_count)
    return stars
}

function find() {
    try {
        const profiles = document.querySelectorAll('#dashboard > div > div > div > div > div > span')
        profiles.forEach((profile) => {
            profile.addEventListener("mouseover", () => {
                setTimeout(showStar, 1000)
            })
        })
    } catch (err){
        console.log(err)
    }
}

async function showStar() {
    const userInfo = document.querySelector('body > div.Popover.js-hovercard-content.position-absolute > div > div > div > div.d-flex.mt-3 > div.overflow-hidden.ml-3 > div.mt-1 > div')
    const userName = document.querySelector('body > div.Popover.js-hovercard-content.position-absolute > div > div > div > div.d-flex.mt-3 > div.overflow-hidden.ml-3 > a.link-gray.no-underline.ml-1')
    const stars = await getStar(userName.innerHTML)
    userInfo.innerHTML += '\nStar: ' + stars
}

main()