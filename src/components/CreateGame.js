import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import Button from 'components/common/Button';
import TextInput from 'components/common/TextInput';
import Incrementer from 'components/common/incrementer/Incrementer';
import CreateGameOptions from 'games/rps/options/CreateGameOptions';

import styles from './createGame.css';
import formStyles from 'containers/forms/form.css';

export default class CreateGame extends React.Component {
  constructor() {
    super();

    this.state = {
      comment: '',
      specifics: {},
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeComment = this.handleChange.bind(this, 'comment');
    this.handleChangeSpecifics = specifics => this.setState({ specifics });
  }
  handleSubmit(e) {
    e.preventDefault();
    this.props.createGame(this.state);
  }
  handleChange(field, e) {
    this.setState({
      [field]: e.target.value,
    });
  }
  render() {
    const { disabled } = this.props;
    return (
      <div className={styles.container}>
        <form onSubmit={this.handleSubmit}>

          <div className={formStyles.formInput}>
            <Incrementer
              label="Players"
              value={2} disabled
            />
          </div>

          <CreateGameOptions
            onChange={this.handleChangeSpecifics}
            values={this.state.specifics}
          />

          <div className={formStyles.formInput}>
            <TextInput
              label="Comment"
              onChange={this.handleChangeComment}
            />
          </div>

          <Button
            disabled={disabled}
            btnStyle="primary"
          >
            Create game
          </Button> <Link to="/play">Cancel</Link>
        </form>
      </div>
    );
  }
}

CreateGame.propTypes = {
  createGame: PropTypes.func.isRequired,
  disabled: PropTypes.bool,
};
