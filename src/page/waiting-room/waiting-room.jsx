import { useCallback, useEffect, useState } from 'react';
import { Global, css } from '@emotion/react';
import { useNavigate } from 'react-router-dom';
import styled from '@emotion/styled';
import { socket } from '../../App';

const Head = styled.div`
  padding: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #FFE500;
`;

const Table = styled.table`
  width: 90%;
  margin: auto;
  background-color: white;
  border-collapse: collapse;
  margin-top: 3rem;
  box-shadow: 0px 0px 7px grey;
  padding: 3rem;
  border-radius: 20px;

  thead {
    font-weight: bold;
    white-space: pre-wrap;
    th {
      padding: 10px;
    }
  }

  tbody {
    padding: 10px;
    text-align: center;
    font-weight: bold;
  }

  th,
  td {
    font-size: 1.2rem;
    font-weight: bold;
    padding: 20px;
  }

  button {
    width: 100px;
    padding: 10px 10px;
    border: none;
    border-radius: 20px;
    font-size: 1.1rem;
    font-weight: bold;
    box-shadow: 0px 0px 4px grey;
    background-color: whitesmoke;
    cursor: pointer;
  }
`;

const WaitingRoom = () => {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const roomListHandler = (rooms) => {
      setRooms(rooms);
    };
    const createRoomHandler = (newRoom) => {
      setRooms((prevRooms) => [...prevRooms, newRoom]);
    };
    const deleteRoomHandler = (roomName) => {
      setRooms((prevRooms) => prevRooms.filter((room) => room !== roomName));
    };

    socket.emit('room-list', roomListHandler);
    socket.on('create-room', createRoomHandler);
    socket.on('delete-room', deleteRoomHandler);

    return () => {
      socket.off('room-list', roomListHandler);
      socket.off('create-room', createRoomHandler);
      socket.off('delete-room', deleteRoomHandler);
    };
  }, []);

  const onCreateRoom = useCallback(() => {
    const roomName = prompt('방 이름을 입력해 주세요.');
    if (!roomName) return alert('방 이름은 반드시 입력해야 합니다.');

    socket.emit('create-room', roomName, (response) => {
      if (!response.success) return alert(response.payload);

      navigate(`/room/${response.payload}`);
    });
  }, [navigate]);

  const onJoinRoom = useCallback(
    (roomName) => () => {
      socket.emit('join-room', roomName, () => {
        navigate(`/room/${roomName}`);
      });
    },
    [navigate]
  );

  return (
    <div>
      <Global
        styles={css`
          body {
            background-color: #FFF8B5;
          }
        `}
      />
      <Head>
        <div style={{ fontWeight: 'bold', fontSize: '2rem', margin: 'auto', paddingLeft: '5rem' }}>채팅방 목록</div>
        <button
          style={{
            background: 'whitesmoke',
            borderRadius: '20px',
            border: 'none',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            padding: '13px 20px',
            marginRight: '10px',
            boxShadow: '0px 0px 4px grey',
            cursor: 'pointer'
          }}
          onClick={onCreateRoom}
        >
          채팅방 생성
        </button>
      </Head>
      <Table>
        <thead>
          <tr>
            <th>방번호</th>
            <th>방이름</th>
            <th>입장</th>
          </tr>
        </thead>
        <tbody>
          {rooms.map((room, index) => (
            <tr key={room}>
              <td>{index + 1}</td>
              <td>{room}</td>
              <td>
                <button onClick={onJoinRoom(room)}>입장하기</button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default WaitingRoom;
