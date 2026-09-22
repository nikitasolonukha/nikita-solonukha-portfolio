# Motion system · portfolio shell

The reference is the feeling of [Dennis Snellenberg's portfolio](https://dennissnellenberg.com/), not his code or assets. Implementation here is independent, with Nikita's portrait and product media. Motion is restrained and always secondary to readable content.

- **Smooth scroll:** locally bundled Lenis 1.3.26, desktop fine-pointer wheel only, `lerp: .105`, `wheelMultiplier: .9`; touch and reduced-motion use native scroll. Lenis updates GSAP ScrollTrigger from the same ticker, with lag smoothing disabled.
- **Hero:** photo scale/opacity first, meta and name reveal next, navigation last. Horizontal desktop name moves at a quiet baseline and gains a bounded impulse from scroll velocity/direction. The mobile name remains fully readable on two lines with an entrance reveal. Hero photo moves 8vh and scales 1.025 during exit; the intro overlaps it slightly.
- **Cursor and Work:** a small desktop cursor changes to View/Play/↗ context. One floating Work media container follows the pointer with interpolation and at most ±2° rotation. It changes image between rows rather than recreating the frame.
- **Magnetic CTA:** contact circles, About link and next-case link move only 12% of pointer displacement and ease back on leave.
- **Reveal primitives:** text uses short translation/opacity/clip; media uses a brief clip reveal with 1.05→1 image scale; list rows use a short stagger. ScrollTrigger starts near the viewport edge and runs once.
- **Page transition:** an opaque graphite layer covers internal navigation in .3s and leaves on arrival in .42s. Native navigation and history remain intact; reduced motion skips it. Next-case uses the same system.
- **Section themes:** the hero is charcoal, Work/About/Archive/Case are neutral paper, Contact returns to graphite. The intro's curved overlap is the scene boundary. Project media retain their own palette.
- **Mobile menu:** full viewport, four large destinations plus social links. Escape closes it. Desktop navigation remains quiet.
- **Accessibility/performance:** no mandatory scroll snap, no custom cursor on touch, no Lenis in reduced-motion mode, no autoplay changes to case video, animations primarily use transforms/opacity. Ticker, Lenis, cursor and ScrollTriggers are disposed on pagehide. If JS fails, content stays visible and links navigate natively.

Implementation: `site/motion.js`, `site/motion.css`, locally bundled Lenis/GSAP files and licenses in `site/vendor/`. [Lenis integration](https://github.com/darkroomengineering/lenis/blob/main/README.md) and [ScrollTrigger velocity API](https://gsap.com/docs/v3/Plugins/ScrollTrigger/) informed the independent code.
