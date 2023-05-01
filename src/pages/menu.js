import React, {useState, useEffect} from "react"
import { Link } from "react-router-dom"

function Menu(props)
{

  const [numItems, setNumItems] = useState(0);
  

    return(
        <div> 
<nav>

  <div class="container sb">
  
      <ul>

        <li>
          <Link to ="/">Accueil</Link>
        </li>

        <li>
          <Link to ="/shops">Magasins</Link>
        </li>
        <li>
          <Link to ="/articles">Articles</Link>
        </li>
        
      </ul>

      <div>

            <li><a href="/cart">Panier</a> ({numItems})</li>

      </div>

  </div>

</nav>

        </div>

    )
}

export default Menu;