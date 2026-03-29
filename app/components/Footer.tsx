import Link from "next/link"

const Footer = () => {
  return (
    <div className="flex w-full bg-black justify-center items-center pt-4">
      <div className="border-t border-white/10 max-w-6xl py-8 text-white flex gap-20"> 
       <p>© StocKing</p>
       <div className="flex gap-12">
        <Link  href="/termsofuse">terms of use</Link>
        <Link href="/privacy" >Privacy Policy </Link>
       </div>
      </div>
    </div>
  )
}

export default Footer
