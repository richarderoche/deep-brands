export default function IconNavClose({...props}: React.SVGProps<SVGSVGElement>) {
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
      <line x1="8" x2="22" y1="8" y2="22" />
      <line x1="22" x2="8" y1="8" y2="22" />
    </svg>
  )
}
