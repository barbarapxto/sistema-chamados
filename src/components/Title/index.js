import './title.css';

export default function Title({ children }) {
    return (
        <div className='title'>
            <h3>{children}</h3>
        </div>
    );
}
