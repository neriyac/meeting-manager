const filterList = ['all', 'mine', 'Weeked Meeting', 'Sunday Meeting', 'New Project', 'Other']

export default function ProjectFilter({ filter, changeFilter }) {

    const handleClick = (newFilter) => {
        changeFilter(newFilter)
    }

return (
    <div className="project-filter">
      <nav>
        <p>Filter by:</p>
        {filterList.map((f) => (
            <button
                key={f}
                onClick={() => handleClick(f)}
                className={filter === f ? 'active' : ''}
            >{f}</button>
        ))}
      </nav>
    </div>
  )
}


