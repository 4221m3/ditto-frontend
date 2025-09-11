import { useNavigate } from 'react-router-dom';
import BtnView from "../../Buttons/BtnView/BtnView";
import { BtnNodeDel } from '../../Buttons/BtnNodeDel/BtnNodeDel';

import './NodeJob.css';

import placeholder from '../../../public/placeholder2.webp'

export interface JobData {
  id: string;
  name: string;
  desc: string;
  urls: string[];
}

export function NodeJob(
  {
    data,
    on_delete }:
  { 
    data: JobData,
    on_delete: (job_id: string) => void
  } ) 
{

  const navigate = useNavigate();

  const handle_view_sequences = async () => {
      const viewport_props = {
        ids: [data.id],
        type: 'sequence',
      };

      navigate('/sequence', { state: viewport_props })
  };

  return (
    <div
      className="node-job"
    >
      <div className="node-job-image d-flex align-items-center justify-content-center">
        <img src={placeholder} alt="Placeholder" className='h-100'/>
      </div>

      <div className="node-job-info">
        <div className="node-job-buttons">
          <BtnView
            on_click={handle_view_sequences}
            aria_label="View job sequences."
          />
          <BtnNodeDel
            on_click={() => on_delete(data.id)}
            aria_label="Delete job."
          />
        </div>

        <div className="node-job-content">
          <strong className="node-job-header">{data.name}</strong>
          <p className="node-job-desc">{data.desc}</p>
        </div> 
      </div>
    </div>
  );

}