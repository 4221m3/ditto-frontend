import {
  useCallback,
  type FC,
} from 'react';

import {
  addEdge,
  useEdgesState,
  useNodesState,
  useReactFlow,
  ReactFlow,
  Background,
  type Edge,
  type Node,
  type OnConnect,
  type OnConnectEnd,
} from '@xyflow/react';
 
import BtnAddNode from '../Buttons/BtnAddNode/BtnAddNode';
import BtnDelNode from '../Buttons/BtnDelNode/BtnDelNode';
import BtnExit from '../Buttons/BtnExit/BtnExit';

import { NodeAction } from '../Nodes/NodeAction/NodeAction.tsx';
import { NodeSequence } from '../Nodes/NodeSequence/NodeSequence.tsx';


import '@xyflow/react/dist/style.css';

// #region Initialization
const initial_node: Node = {
  id: '1',
  position: { x: 250, y: 50 },
  type: 'node_action',
  data: {
    type: 'click',
    settings:{
      xpath: '',
      wait: 5,
      clicks: 1
    }
  },
};

const initial_nodes: Node[] = [initial_node];
const initial_edges: Edge[] = [];

let id = 1;
const get_id = () => `${++id}`;

const snap_grid = [10, 10];
const node_types = {
  node_action: NodeAction,
  node_sequence: NodeSequence,
};

const default_viewport = { x: 0, y: 0, zoom: 1.5 };

// #endregion
 
export interface ViewportProps {
  id: string
  type: 'action' | 'sequence';
}

const Viewport: FC<ViewportProps> = ({id, type = "sequence"}) => {

  const [nodes, set_nodes, on_nodes_change] = useNodesState(initial_nodes);
  const [edges, set_edges, on_edges_change] = useEdgesState(initial_edges);
  const { screenToFlowPosition } = useReactFlow();

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

        set_edges((eds) =>
          eds.concat({ id: new_node_id, source: connection_state.fromNode.id, target: new_node_id }),
        );
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

        set_nodes((nds) => nds.concat(new_node));

  }, [nodes, set_nodes]);

  const handle_del_node = useCallback(() => {
    
    const selected_node = nodes.find(node => node.selected);

    if (selected_node) {
      set_nodes((nds) => nds.filter((node) => node.id !== selected_node.id));
    }

  }, [nodes, set_nodes]);
  
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

        <BtnAddNode
          on_click={handle_add_node}
          aria_label="Add Node"
        />

        <BtnDelNode
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
            onClick={() => alert('Exiting to parent sequence!')}
            ariaLabel="Exit to parent sequence"
        />
      </div>

    </div>
  );
  
};
 
export default Viewport;