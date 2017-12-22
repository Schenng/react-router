import React, { Component } from 'React';
import { Link } from 'react-router-dom';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createPost } from '../actions'

class PostsNew extends Component {
  renderField(field){
      const { meta: {touched, error} } = field;
      const className = `form-group ${ touched && error ? 'has-danger' : ''}`

      return(
        <div className={className}>
          <label> {field.label} </label>
          <input
            className="form-control"
            {...field.input}
          />
          <div className="text-help">
            { touched ? error : ''}
          </div>
        </div>
      );
  }

  onSubmit(values) {
    console.log(values);
    this.props.createPost(values,() => {
      this.props.history.push('/');
    });
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div>
        <Link className="btn btn-primary" to="/">
          Back to index
        </Link>
        <div>
          <form onSubmit={ handleSubmit (this.onSubmit.bind(this))}>
            <Field
              name="title"
              label="Title"
              component={this.renderField}
            />
            <Field
              name="categories"
              label="Categories"
              component={this.renderField}
            />
            <Field
              name="content"
              label="Content"
              component={this.renderField}
            />
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    );
  }
}

function validate(values) {
  const errors = {}
    if (!values.title || values.title.length < 3) {
      errors.title = "Enter a title fool."
    }
    if (!values.categories) {
      errors.categories = "Enter some categories."
    }
    if (!values.content) {
      errors.content = "Enter some content."
    }
  return errors;
}

export default reduxForm({
  validate: validate,
  form: 'PostsNewForm'
})(connect(null, {createPost })(PostsNew));
