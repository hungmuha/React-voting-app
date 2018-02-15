class ProductList extends React.Component{
	//ProductList is the parent component
	constructor(props){
		//although we don't supply the component with any props
		// use super props and constructor(props) as default because it is just a good habit
		super(props);

		this.state = {
			products:[],
		};
		//the only way to set state like above is in constructor
		this.handleProductUpVote= this.handleProductUpVote.bind(this);
	}

	componentDidMount() {
		//one lifecycle method componentDidMount
		this.setState({ products: Seed.products});
		//never modify state outside of this.setState()

	}

	handleProductUpVote(productId) {
		console.log(productId+ ' was upvoted.');
		const nextProducts = this.state.products.map((product)=>{
			if(product.id === productId) {
				//use Object.assign to create a copy of products to prevent mutating the state.product
				return Object.assign({},product,{
						votes: product.votes+1,
				});
			} else{
				return product;
			}
		});

		this.setState({
			products: nextProducts,
		});
}

	render(){
		const products = this.state.products.sort((a,b)=>(
			b.votes - a.votes
		));
		const productComponents = products.map((product)=>(
				<Product
					// using {} signaliing to JSX that resides in between the braces is Javascript
					key={'product- ' + product.id}
					id ={product.id}
					title ={product.title}
					description={product.description}
					url={product.url}
					votes={product.votes}
					submitterAvatarUrl={product.submitterAvatarUrl}
					productImageUrl={product.productImageUrl}
					onVote={this.handleProductUpVote}
				/>
		));
		return (
			<div className='ui unstackable items'>
				{productComponents}
			</div>
		)
	}
}

class Product extends React.Component {
	constructor(props) {
		
		super(props);
		//super(props) to supply the component with prop 
		// need to use constructor to mount custom method to the component otherwise the method is empty
		this.handleUpVote = this.handleUpVote.bind(this);
	}

	handleUpVote() {
		this.props.onVote(this.props.id);
		//this in this method is not enought to mount the method to component, need to be declared in constructor
	}

	render() {
		return(
			<div className='item'>
				<div className='image'>
					<img src ={this.props.productImageUrl}/>
				</div>
				<div className='middle aligned content'>
					<div className="header">
						<a onClick={this.handleUpVote}>
							<i className='large caret up icon'/>
						</a>
						{this.props.votes}
					</div>
					<div className='description'>
						<a href={this.props.url}>
							{this.props.title}
						</a>
						<p>
							{this.props.description}
						</p>
					</div>
					<div className="extra">
						<span>Submited by:</span>
						<img
						  className='ui avatar image'
						  src={this.props.submitterAvatarUrl}
						/>
					</div>
				</div>
			</div>
		);
	}

}

ReactDOM.render(
	<ProductList/>,
	document.getElementById('content')
);
