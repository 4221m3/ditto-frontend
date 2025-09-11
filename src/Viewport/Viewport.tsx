import {
  useState,
  useEffect,
  useCallback,
  type FC,
} from 'react';

import { useNavigate } from 'react-router-dom';

import {
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  Background,
  ReactFlow,
  type Edge,
  type Node,
  type OnConnect,
  type OnConnectEnd,
} from '@xyflow/react';

import { BtnNodeAdd } from '../Buttons/BtnNodeAdd/BtnNodeAdd.tsx';
import { BtnNodeDel } from '../Buttons/BtnNodeDel/BtnNodeDel.tsx';
import { BtnExit } from '../Buttons/BtnExit/BtnExit';

import { NodeAction } from '../Nodes/NodeAction/NodeAction.tsx';
import { NodeSequence } from '../Nodes/NodeSequence/NodeSequence.tsx';
import { auth_store } from '../store/auth.tsx';
import { useLocation } from 'react-router-dom';
import '@xyflow/react/dist/style.css';


let id = 1;
const get_id = () => `${++id}`;

const snap_grid = [10, 10];
const node_types = {
  node_action: NodeAction,
  node_sequence: NodeSequence,
};

const default_viewport = { x: 0, y: 0, zoom: 1.5 };
 
export const Viewport: FC = () => {

  const navigate = useNavigate();

  const location = useLocation();
  const { ids, type } = location.state || { ids: [], type: "sequence" }; // Provide default values to prevent errors

  const token = auth_store((state) => state.token);

  if (!token) {
    return <div>You are not authenticated. Please log in.</div>;
  };

  const [nodes, set_nodes, on_nodes_change] = useNodesState<Node>([]);
  const [edges, set_edges, on_edges_change] = useEdgesState<Edge>([]);

  const { screenToFlowPosition } = useReactFlow();

  useEffect(() => {

    const fetch_nodes = async () => {
        if (!token) return;

        const react_flow_wrapper = document.querySelector('.react-flow__pane');
        if (!react_flow_wrapper) return;

        const viewport_height = react_flow_wrapper.clientHeight;

        set_nodes([]);
        set_edges([]);
        
        let current_x = 0;
        let current_y = viewport_height / 2;

        try {
          
          let url = `http://localhost:8000/jobs/${ids[0]}/sequences/`;

          if (type==="action"){
            url = `http://localhost:8000/jobs/${ids[0]}/sequences/${ids[1]}/actions`;
          }

            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch jobs.');
            }

            const response_json = await response.json();

            for (const node of response_json) {
              
              const new_node: Node = {
                id: node["id"],
                position: screenToFlowPosition({
                  x: current_x,
                  y: current_y,
                }),
                type: type === 'action' ? 'node_action' : 'node_sequence',
                data: type === "action" ? {
                    type: node["type"],
                    settings: node ["settings"]
                  }:{
                    type: node["stop_condition"]["type"],
                    settings: node ["stop_condition"]["settings"]
                  }
              };
              
              current_x += 600;
              current_y += 0;

              set_nodes((nds) => nds.concat(new_node));
            }

            for (const node of response_json) {
              
              const new_edge: Edge = {
                id: node["id"] + node["next_id"],
                source: node["id"],
                target: node["next_id"],
              };

              set_edges((edg) => edg.concat(new_edge));
            }

        } catch (error) {
            console.error('Error fetching jobs:', error);
        }

    };

    fetch_nodes();

  }, [token]);

  const on_connect_start: OnConnect = useCallback(
    (params) => set_edges((eds) => addEdge(params, eds)),
    [],
  );

  const on_connect_end: OnConnectEnd = useCallback(
    (event, connection_state) => {

      // When a connection is dropped on the pane it's not valid
      if (!connection_state.isValid) {

        // we need to remove the wrapper bounds, in order to get the correct position
        const new_node_id = get_id();

        const { clientX, clientY } = 'changedTouches' in event ? event.changedTouches[0] : event;

        const new_node_data = type === 'action' ?
          {
            type: 'node_action',
            data: {
              type: 'click',
              settings:{
                xpath: '',
                wait: 5,
                clicks: 1
              }
            },
          } :
          {
            type: 'node_sequence',
            data: {
              type: 'counter',
              settings:{
                iterations: 1
              }
            },
          };


        const new_node: Node = {
          id: new_node_id,
          position: screenToFlowPosition({
            x: clientX,
            y: clientY,
          }),
          ...new_node_data
        };

        set_nodes((nds) => nds.concat(new_node));
        set_edges((eds) => eds.concat({ id: new_node_id, source: connection_state.fromNode.id, target: new_node_id }));
      }

    },
    [screenToFlowPosition],
  );

  const handle_add_node = useCallback(() => {
    
        const new_node_id = get_id();

        const new_node_data = type === 'action' ?
          {
            type: 'node_action',
            data: {
              type: 'click',
              settings:{
                xpath: '',
                wait: 5,
                clicks: 1
              }
            },
          } :
          {
            type: 'node_sequence',
            data: {
              type: 'counter',
              settings:{
                iterations: 1
              }
            },
          };

        const new_node: Node = {
          id: new_node_id,
          position: screenToFlowPosition({
            x: 0,
            y: 0,
          }),
          ...new_node_data
        };
        
        try {
          const response = await fetch(
          'http://localhost:8000/token',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: form_data.toString(),
          }
        );

        if (!response.ok) {
          throw new Error('Invalid username or password.');
        } else {
          const response_json: TokenResponse = await response.json();
          set_token(response_json.access_token);
          window.location.href = '/jobs';
        }
      } catch (error: any) {
        set_error(error.message);
      } finally {
        set_loading(false);
      }

      set_nodes((nds) => nds.concat(new_node));

  }, [nodes, set_nodes]);

  const handle_del_node = useCallback(() => {
    
    const selected_node = nodes.find(node => node.selected);

    if (selected_node) {
      set_nodes((nds) => nds.filter((node) => node.id !== selected_node.id));
    }

  }, [nodes, set_nodes]);
  
  const handle_exit = useCallback(() => {
    if (type === "sequence") {
      navigate('/jobs'); 
    }
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%' }}>

      <ReactFlow
        nodes={nodes}
        edges={edges}

        onNodesChange={on_nodes_change}
        onEdgesChange={on_edges_change}

        onConnect={on_connect_start}
        onConnectEnd={on_connect_end}

        nodeTypes={node_types}

        snapToGrid={true}
        snapGrid={[snap_grid[0], snap_grid[1]]}
      
        defaultViewport={default_viewport}

        fitView
        attributionPosition="bottom-left"
      >  
        <Background />
      </ReactFlow>

      <div
        style={{
          position: 'absolute',
          bottom: 10,
          left: 10,
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          zIndex: 10,
        }}
      >

        <BtnNodeAdd
          on_click={handle_add_node}
          aria_label="Add Node"
        />

        <BtnNodeDel
          on_click={handle_del_node}
          aria_label="Delete Selected Node"
        />

      </div>

      <div
        style={{
            position: 'absolute',
            top: 10,
            left: 10,
            zIndex: 10,
        }}
      >
        <BtnExit
            onClick={handle_exit}
            ariaLabel="Exit to parent sequence"
        />
      </div>

    </div>
  );
};

//#region Props

interface Props {
  ids: string[];
  type: 'action' | 'sequence';
}

//#endregion