import {html, Component} from '../lib.js'
import gsap from '../animations.js'
const textBase = {
	lang: 'vi',
	textTranslate() {
		const lang = this.getLang() || 'vi'
		if (lang === 'vi') {
			return {
				Play: 'Chơi',
				Tutorial: 'Hướng dẫn',
				Collection: 'Bộ sưu tập',
				Highscores: 'Xếp hạng',
				Changelog: 'Thay đổi',
				Manual: 'Hướng dẫn',
				Language: 'Ngôn ngữ',
			}
		} else if (lang === 'en') {
			return {
				Play: 'Play',
				Tutorial: 'Tutorial',
				Collection: 'Collection',
				Highscores: 'Highscores',
				Changelog: 'Changelog',
				Manual: 'Manual',
				Language: 'Language',
			}
		}
	},
	getLang() {
		// get cookie
		if (document.cookie) {
			const lang = document.cookie.split(';').find((c) => c.includes('lang'))
			if (lang) {
				this.lang = lang.split('=')[1]
			}
		} else {
			this.lang = 'en'
		}
		return this.lang
	},
}

export default class SplashScreen extends Component {
	componentDidMount() {
		gsap.from(this.base, {duration: 0.4, autoAlpha: 0, scale: 0.98})
		gsap.to(this.base.querySelector('.Splash-spoder'), {delay: 3, x: 420, y: 60, duration: 1})
	}

	render(props) {
		return html`
			<article class="Container Splash--fadein">
				<header class="Header">
					<h1>Slay the Web</h1>
					<h2>A card crawl adventure for you and your browser</h2>
					<img class="Splash-spoder" src="/images/spoder.png" title="Oh hello" />
				</header>
				<div class="Box">
					<ul class="Options">
						${location.hash
							? html`
								<li>Found a saved game. <button autofocus onClick=${props.onContinue}>Continue?</button></li>
								<li><button onClick=${props.onNewGame}>New Game</a></li>
					`
							: html`
							<li><button autofocus onClick=${props.onNewGame}>
								${textBase.textTranslate()['Play']}
							</a></li>
							<li><a class="Button" href="/?debug&tutorial">
								${textBase.textTranslate()['Tutorial']}
							</a></li>
							`}
						${html`<li>
							<a class="Button" href="/collection">${textBase.textTranslate()['Collection']}</a>
						</li>`}
						${html`<li><a class="Button" href="/stats">${textBase.textTranslate()['Highscores']}</a></li>`}
						${html`<li>
							<a class="Button ChangeLang" href="/lang">${textBase.textTranslate()['Language']}</a>
						</li>`}
					</ul>
					<p center>
						<small><a href="/changelog">Changelog</a> & <a href="/manual">Manual</a></small>
					</p>
				</div>
			</article>
		`
	}
}
