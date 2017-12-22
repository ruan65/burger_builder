import React, {Component} from 'react'
import Burger from '../../components/Burger/Burger'
import Aux from '../../hoc/Aux'

class BurgerBuilder extends Component {

  constructor(props) {
    super(props)
    this.state = {
      ingredients: {
        salad: 0,
        bacon: 0,
        cheese: 0,
        meat: 0
      }
    }
  }

  render() {

    return (
      <Aux>
        <Burger ingredients={this.state.ingredients}/>
        <div>Build Controls</div>
      </Aux>
    )
  }
}

export default BurgerBuilder