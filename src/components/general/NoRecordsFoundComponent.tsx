import "../../scss/App.scss";

import image from "../../assets/no-records-found.webp";

export default function NoRecordsFoundComponent() {
  return (
    <div className="noRecordsFound">
      <img className="noRecordsFound-image" src={image} />
      <div className="text-center text-h5">Tu nie je nič</div>
    </div>
  );
}
