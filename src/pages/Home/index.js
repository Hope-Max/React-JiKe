import BarChart from "./components/BarChart"

const frameworks = {
  title: "Most used web frameworks among developers worldwide, as of 2023",
  name: ['Node.js', 'React', 'jQuery', 'Express', 'Angular', 'Next.js', 'ASP.NET CORE', 'Vue.js'],
  data: [42.65, 40.58, 21.98, 19.28, 17.46, 16.67, 16.57, 16.38]
}

const languages = {
  title: "Most used programming languages among developers worldwide as of 2023",
  name: ['JavaScript', 'HTML/CSS', 'Python', 'SQL', 'TypeScript', 'Bash/Shell', 'Java', 'C#'],
  data: [63.61, 52.97, 49.28, 48.66, 38.87, 32.37, 30.55, 27.62]
}

const Home = () => {
  return (
    <div>
      <BarChart title={frameworks.title} name={frameworks.name} data={frameworks.data} />
      <BarChart title={languages.title} name={languages.name} data={languages.data} />
    </div>
  )
}

export default Home