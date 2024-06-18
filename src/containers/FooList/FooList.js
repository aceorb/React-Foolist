import { connect } from 'react-redux';
import { getAllFoos, toggleCompleteFoo, createFoo } from '../../reducers/foo/foo';
import FooList from '../../components/FooList';

const mapStateToProps = (state) => ({
  fooList: getAllFoos(state),
});

const mapDispatchToProps = {
  createFoo,
  toggleCompleteFoo,
};

export default connect(mapStateToProps, mapDispatchToProps)(FooList);