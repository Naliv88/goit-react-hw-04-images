import React from 'react';
import style from './Searchbar.module.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const Searchbar = ({onSubmit}) => {
  const [input, setInput] = useState("");

    const handleChange = evt => {
    setInput(evt.currentTarget.value);
  };

 const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(input);
  };
  
    return (
      <header className={style.Searchbar}>
        <form className={style.SearchForm} onSubmit={handleSubmit}>
          <button type="submit" className={style.SearchFormButton}>
            <span className={style.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={style.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={input}
            onChange={handleChange}
          />
        </form>
      </header>
    );

}
   

// export default class Searchbar extends Component {
//   state = {
//     input: '',
//   };

//   handleChange = evt => {
//     this.setState({ input: evt.currentTarget.value });
//   };

//   handleSubmit = evt => {
//     evt.preventDefault();
//     const inputData = this.state.input;
//     this.props.onSubmit(inputData);
//   };

//   render() {
//     return (
//       <header className={style.Searchbar}>
//         <form className={style.SearchForm} onSubmit={this.handleSubmit}>
//           <button type="submit" className={style.SearchFormButton}>
//             <span className={style.SearchFormButtonLabel}>Search</span>
//           </button>

//           <input
//             className={style.SearchFormInput}
//             type="text"
//             autoComplete="off"
//             autoFocus
//             placeholder="Search images and photos"
//             value={this.state.input}
//             onChange={this.handleChange}
//           />
//         </form>
//       </header>
//     );
//   }
// };

Searchbar.propTypes  = {
onSubmit: PropTypes.func.isRequired,
}
export default Searchbar;