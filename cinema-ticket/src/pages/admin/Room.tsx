 import { useEffect, useState } from 'react';
import { supabase } from '../../utils/apputils';
import type { RoomListItem } from '../../types/room';
import { Modal } from 'react-bootstrap';

function Room() {
    const [show, setShow] = useState(false);
    const [rooms, setRooms] = useState<RoomListItem[]>([]);
    const [newRoomName, setNewRoomName] = useState('');
    async function loadRooms() 
    {
        const { data, error } = await supabase.from('rooms').select('*');
        if (error) {
            console.error('Error loading rooms:', error);
        } else {
            console.log('Rooms data:', data);
        }
      setRooms(data as RoomListItem[]);
    }
   async function DelectRoom(id:number){
        const confirmed = window.confirm('Bạn có chắc muốn xóa phòng này?');
        const{error} = confirmed? await supabase.from('rooms').delete().eq('id', id) : {error: null};
        if (error) {
            alert('Lỗi khi xóa phòng: ' + error.message);
        } else {
            alert('Xóa phòng thành công');
            await loadRooms();
        }
    }
    async function AddRoom(){
        if (!newRoomName.trim()) {
            alert('Vui lòng nhập tên phòng');
            return;
        }
        const { error } = await supabase.from('rooms').insert([{ room_name: newRoomName }]);
        if (error) {
            alert('Lỗi khi thêm phòng: ' + error.message);
        } else {
            alert('Thêm phòng thành công');
            setNewRoomName('');
            await loadRooms();
            setShow(false);
        }
    }
    useEffect (() => {
        loadRooms();
    }, []);
    return(
        <>
            <h1 className='text-danger'>Room Page</h1>
            <div className="my-3">
                <button className='btn btn-primary' onClick={() => setShow(true)}>Thêm Phòng</button>
            </div>
            <table className='table table-bordered'>
                <thead>
                    
                <tr>
                <th>Id</th>
                <th>Tên Phòng</th>
                <th>Ngày tạo</th>
                <th>Mã Người Dùng</th>
                <th>Chức năng</th>
                </tr>
                </thead>
                <tfoot>
                {rooms.map(room => (
                    <tr key={room.id}>
                        <td>{room.id}</td>
                        <td>{room.room_name}</td>
                        <td>{room.created_at}</td>
                        <td>{room.created_by}</td>
                        <td>
                            <button className='btn btn-sm btn-primary me-2'>Edit</button>
                            <button className='btn btn-sm btn-danger' onClick={async () => await DelectRoom(room.id) }>Delete</button>
                        </td>
                    </tr>
                ))} 
                </tfoot>
                
            </table>
            <Modal show={show} onHide={() => setShow(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thêm Phòng</Modal.Title>
                </Modal.Header>
                <Modal.Body>
            <form onSubmit={(e) => {
                e.preventDefault();
                AddRoom();
            }}>
                <div className="mt-3">
                    <label className='form-label'>Tên Phòng</label>
                    <input type="text" className="form-control" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} placeholder="Nhập tên phòng..." />
                </div>
                <div className="mt-6">
                    <button type="submit" className="btn btn-primary mt-3">Add Room</button>
                </div>
            </form>
            </Modal.Body>
            </Modal>
        </>
    )
}

export default Room;