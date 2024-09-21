import "./Footer.css";

export const Footer = () => {
    return (
        <footer>
            <p>@imizone 2024</p>
            <div className="last">
                <a href="http://www.facebook.com"><img src="/images/fb.png" alt="Car" className="media-pic" /></a>
                <a href="http://www.instagram.com"><img src="/images/insta.png" alt="Car" className="media-pic" /></a>
                <a href="http://www.youtube.com"><img src="/images/ut.png" alt="Car" className="media-pic" /></a>
            </div>
        </footer>
    );
};