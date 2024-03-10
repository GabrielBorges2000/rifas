export interface HomeProps {}

export default function Home(props: HomeProps) {
  return (
    <div className="flex items-center justify-center min-h-screen" {...props}>
      <h1>Home</h1>
    </div>
  )
}
