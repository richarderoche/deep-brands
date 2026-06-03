import {
  FaFacebookF,
  FaGithub,
  FaInstagram,
  FaLinkedinIn,
  FaSoundcloud,
  FaSpotify,
  FaThreads,
  FaTiktok,
  FaXTwitter,
  FaYoutube,
} from 'react-icons/fa6'

const SocialIcon = (name) => {
  switch (name.name) {
    case 'Facebook':
      return <FaFacebookF className="block" />
    case 'Instagram':
      return <FaInstagram className="block" />
    case 'Soundcloud':
      return <FaSoundcloud className="block" />
    case 'Spotify':
      return <FaSpotify className="block" />
    case 'Tiktok':
      return <FaTiktok className="block" />
    case 'Twitter':
      return <FaXTwitter className="block" />
    case 'Threads':
      return <FaThreads className="block" />
    case 'YouTube':
      return <FaYoutube className="block" />
    case 'Github':
      return <FaGithub className="block" />
    case 'Linkedin':
      return <FaLinkedinIn className="block" />
  }
}

export default SocialIcon
