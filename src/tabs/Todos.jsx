import { Component } from 'react';
import { nanoid } from 'nanoid';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';

export class Todos extends Component {
  state = {
    todos: [],
    isEditing: false,
    currentTodo: {},
  };

  onCancel = () => {
    this.setState({ isEditing: false });
  }

  delItem = id => {
    const res = this.state.todos.filter(item => item.id !== id);
    this.setState({ todos: res });
  };

  editItem = todo => {
    this.setState({ currentTodo: todo, isEditing: true });
  };

  onHadleSubmit = text => {
    this.setState(prevState => ({
      todos: [...prevState.todos, { id: nanoid(), text: text }],
    }));
  };

  render() {
    console.log(this.state.todos);
    const { isEditing, currentTodo } = this.state;
    return (
      <>
        {isEditing ? (
          <EditForm onCancel={this.onCancel} currentTodo={currentTodo} />
        ) : (
          <SearchForm onSubmit={this.onHadleSubmit} />
        )}
        <Grid>
          {this.state.todos.map(({ id, text }, i) => (
            <GridItem key={id}>
              <Todo
                text={text}
                id={id}
                index={i + 1}
                delitem={this.delItem}
                editItem={() => this.editItem({ id: id, text: text })}
              />
            </GridItem>
          ))}
        </Grid>
      </>
    );
  }
}
