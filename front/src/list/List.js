import "./list.css";

export default function List({ base }) {
  let out = (
    <div className="list">
      <ul>
        {base.map((item) => (
          <li>
            <div>
              {item.date} <span> {item.name}</span>
            </div>
            <div className="text">{item.note}</div>
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );

  return out;
}
