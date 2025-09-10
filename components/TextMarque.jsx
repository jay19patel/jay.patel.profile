import ScrollBaseAnimation from "./ScrollBaseAnimation"

const TextMarque = ({text = "Developer • Content Creator • Problem Solver •"}) => {
  return (
      <div className="relative overflow-hidden m-3" style={{
        maskImage: 'linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 32px, black calc(100% - 32px), transparent)'
      }}>
        <ScrollBaseAnimation
          baseVelocity={2}
          scrollDependent={false}
          clasname="font-bold tracking-[-0.05em] leading-[90%] bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent">
          {text}
        </ScrollBaseAnimation>
      </div>
  )
}

export default TextMarque