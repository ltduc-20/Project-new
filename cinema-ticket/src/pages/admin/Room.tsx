 import { useEffect, useState } from 'react';
import { supabase } from '../../utils/apputils';
import type { RoomListItem } from '../../types/room';
import { Button, Modal } from 'react-bootstrap';
import AppModal from '../../components/AppModal';

function Room() {
    const [show, setShow] = useState(false);
    const [rooms, setRooms] = useState<RoomListItem[]>([]);
    const [newRoomName, setNewRoomName] = useState('');
    const [mHeaderText, setMHeaderText] = useState('');
    const [editingRoomId, setEditingRoomId] = useState<number | null>(null);
    function showModal(headerText:string, roomId: number | null = null){
        setMHeaderText(headerText);
        setEditingRoomId(roomId);
        if (roomId === null) setNewRoomName('');
        setShow(true);
    }
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
        if(!confirmed)
        {
            return;
        }
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
        const { status,error } = await supabase.from('rooms').insert({ room_name: newRoomName });
        if (status !== 201) {
            alert('Lỗi khi thêm phòng: ' + error?.message);
        } else {
            alert('Thêm phòng thành công');
            setNewRoomName('');
            await loadRooms();
            setShow(false);
        }
    }
    const [RoomID, setRoomID] = useState('');
    async function EditRoom(id:number) {
        showModal('Sửa Phòng');
        const{data,status}= await supabase.from('rooms').select('*').eq('id',id);
        if(status === 200 && data) {
            const room =(data as RoomListItem[])[0];
            if(room) {
                setNewRoomName(room.room_name);
                setRoomID(room.id.toString());
            }
        }
        const {error} = await supabase.from('rooms').update({ room_name: newRoomName }).eq('id', id);
        if (status !== 200) {
            alert('Lỗi khi cập nhật phòng: ' + error?.message);
        } else {
            alert('Cập nhật phòng thành công');
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
                <button className='btn btn-primary' onClick={() => showModal("Thêm Phòng")}>Thêm Phòng</button>
            </div>
            <table className='table table-bordered'>
                <thead>
                    
                <tr>
                <th>Id</th>
                <th>Tên Phòng</th>
                <th>Ngày tạo</th>
                <th>Chức năng</th>
                </tr>
                </thead>
                <tfoot>
                {rooms.map(room => (
                    <tr key={room.id}>
                        <td>{room.id}</td>
                        <td>{room.room_name}</td>
                        <td>{room.created_at}</td>
                        <td>
                            <button className='btn btn-sm btn-primary me-2' onClick={() => {
                                setNewRoomName(room.room_name);
                                showModal('Sửa Phòng', room.id);
                            }}>Edit</button>
                            <button className='btn btn-sm btn-danger' onClick={async () => await DelectRoom(room.id)}>Delete</button>
                        </td>
                    </tr>
                ))} 
                </tfoot>
                
            </table>
            <AppModal show={show} onHide={() => setShow(false)} headerText={mHeaderText}>
                <form >
                <div className="mb-3">
                    <label htmlFor="roomName" className="form-label">Tên Phòng</label>
                    <input type="text" className="form-control" id="roomName" value={newRoomName} onChange={(e) => setNewRoomName(e.target.value)} />
                </div>
                <button type="button" className="btn btn-primary" onClick={async () => {
                    if (editingRoomId) {
                        const confirmed = window.confirm('Bạn có chắc muốn sửa không ?');
                        if (confirmed) await EditRoom(editingRoomId);
                    } else {
                        await AddRoom();
                    }
                }}>{editingRoomId ? 'Cập nhật' : 'Thêm Phòng'}</button>
                <button type="button" className="btn btn-secondary ms-2" onClick={() => setShow(false)}>Hủy</button>
                </form>
            </AppModal>
        </>
    )
}

export default Room;