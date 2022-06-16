import './App.css';
import GoblinForm from './GoblinForm';
import GoblinList from './GoblinList';
import Goblin from './Goblin';
import { useEffect, useState } from 'react';

function App() {
  const [goblinFormName, setGoblinFormName] = useState('');
  const [goblinFormColor, setGoblinFormColor] = useState('');
  const [goblinFormHP, setGoblinFormHP] = useState(0);
  const [allGoblins, setAllGoblins] = useState([{ name: 'Cheddar', color: 'green', HP: 50 }]);
  const [visibleGoblins, setVisibleGoblins] = useState([]);
  const [filterString, setFilterString] = useState('');

  useEffect(() => {
    setVisibleGoblins(allGoblins);
    setFilterString('');
  }, [allGoblins]);

  function submitGoblin(e) {
    e.preventDefault();
    const newGoblin = { name: goblinFormName, color: goblinFormColor, HP: goblinFormHP };
    // on submit, make a new goblin object with a name that comes from the form state, an hp that comes from the form state, and a color that comes from the form state
    setAllGoblins([...allGoblins, newGoblin]);
    // update the allGoblins array. Add the new goblin to the allGoblins array immutably.
    // clear out the goblin form state items by setting them to empty strings. This will cause the form to reset in the UI.
  }

  function handleDeleteGoblin(name) {
    // find the index of the goblin in allGoblins with this name
    const indexDelete = allGoblins.findIndex((goblin) => goblin.name === name);
    // use splice to delete the goblin object at this index
    allGoblins.splice(indexDelete, 1);
    // update the allGoblins array immutably to this new, smaller array
    setAllGoblins([...allGoblins]);
  }

  function handleFilterGoblins(filterString) {
    const updateGoblins = allGoblins.filter((goblin) =>
      goblin.name.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
    );
    filterString ? setVisibleGoblins(updateGoblins) : setVisibleGoblins(allGoblins);
    // use the filter method to get an array of goblins whose name includes this search argument
    // if there is a search argument, set the visible goblins to the filtered goblins
    // if the search argument is undefined, set the visible goblins in state to just be the array of all goblins
  }

  return (
    <div className="App">
      <div className="current-goblin quarter">
        <Goblin
          goblin={
            {name:goblinFormName, hp:goblinFormHP, color:goblinFormColor
            }
          }
        />
      </div>
      <div className="goblin-filter quarter">
        Filter Goblins
        {/* note that handleFilterGoblins is defined upstairs. This is where the allGoblins array gets filtered */}
        <input onChange={(e) => handleFilterGoblins(e.target.value)} />
      </div>
      <GoblinForm
        submitGoblin={submitGoblin}
        goblinFormName={goblinFormName}
        setGoblinFormName={setGoblinFormName}
        goblinFormColor={goblinFormColor}
        setGoblinFormColor={setGoblinFormColor}
        goblinFormHP={goblinFormHP}
        setGoblinFormHP={setGoblinFormHP}
      />
      <GoblinList
        goblins={visibleGoblins.length ? visibleGoblins : allGoblins} // this takes in an array of goblins. If the filteredGoblins has a length, use that array. Otherwise, use the allGoblins array
        handleDeleteGoblin={handleDeleteGoblin} // note that the goblin list has access to the ability to delete
      />
    </div>
  );
}

export default App;
