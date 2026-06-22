export default function IconNavOpen({...props}: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="30"
      height="30"
      fill="none"
      viewBox="0 0 30 30"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      {...props}
    >
      <line x1="6" x2="24" y1="10" y2="10" />
      <line x1="6" x2="24" y1="15" y2="15" />
      <line x1="6" x2="24" y1="20" y2="20" />
    </svg>
  )
}
