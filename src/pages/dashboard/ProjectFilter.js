const filterList = ['all', 'mine', 'projects', 'sunday', 'weekend', 'other']

export default function ProjectFilter({ currentFilter, changeFilter }) {

    const handleClick = (newFilter) => {
      // console.log(newFilter);
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
                className={currentFilter === f ? 'active' : ''}
            >{f}</button>
        ))}
      </nav>
    </div>
  )
}


