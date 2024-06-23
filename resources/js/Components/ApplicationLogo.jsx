export default function ApplicationLogo(props) {
    return (
        <img src="https://upload.wikimedia.org/wikipedia/en/0/02/DotBlog_domain_logo.png"
             className={`h-7 w-auto object-fit ${props.className}`} alt=""/>
    );
}
