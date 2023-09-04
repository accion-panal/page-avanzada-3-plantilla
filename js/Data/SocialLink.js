import { SocialLink } from "../Data/userId.js";

const loadInformation = ()=>{

    const socialLinks = document.getElementById('social-link');
    if (socialLinks !== null){
        socialLinks.innerHTML =  `
        <li><a href="${SocialLink.facebookLink}" target="_blank"><span class="icon-facebook  text-white"></span></a></li>
        <li><a href="${SocialLink.instagramLink} " target="_blank"><span class="icon-instagram text-white"></span></a></li>
        <li><a href="${SocialLink.twitterLink}" target="_blank"><span class="icon-twitter   text-white"></span></a></li>
        <li><a href="${SocialLink.linkedinLink}" target="_blank"><span class="icon-linkedin  text-white"></span></a></li>
    
        `;
    }
}

loadInformation();