import React, { useEffect, useState, useRef } from 'react'
import { Row, Col } from 'react-bootstrap';
import { ListButton } from './ListButton';
import { SearchSelect } from './searchSelect';
import moment from 'moment'
import './Body.css'
import instance from '../../axios'
import Map from './Map'


export default function Body() {
    const [oData, setOData] = useState([])
    const [runningState, setRunningState] = useState([])
    const [stoppedState, setStoppedState] = useState([])
    const [openedMap, setOpendMap] = useState([]);
    const [inputString, setInput] = useState('');
    const [mapArray, setMapArray] = useState([]);
    const [selectData, setSelectData] = useState([]);
    const [isShow, setIsShow] = useState(false);
    const ref = useRef();
    const Handler = (e) => {
        ref.current?.classList.remove("active"); 
        e?.target.classList.add('active');
        ref.current = e?.target;
    };
    const ChangeHandler = (e) => {
        const string = e.target.value.toUpperCase();
        setInput(string);
    }
    useEffect(() => {
        let stoppedList = []
        let runningList = []
        instance.get('/tt/mobile/logistics/searchTrucks?auth-company=PCH&companyId=33&deactivated=false&key=g2qb5jvucg7j8skpu5q7ria0mu&q-expand=true&q-include=lastRunningState,lastWaypoint').then((data) => {
            data?.data?.data?.forEach((d) => {
                if (d.lastRunningState?.truckRunningState === 1) {
                    runningList.push(d)
                } else if (d.lastRunningState?.truckRunningState === 0) {
                    stoppedList.push(d)

                }
            })
            setRunningState(runningList);
            setStoppedState(stoppedList);
            setOData([...runningList, ...stoppedList]);
            setOpendMap([...runningList, ...stoppedList]);
            setMapArray([...runningList, ...stoppedList]);
            setIsShow(false);
        })


    }, [])
    useEffect(() => {

    }, [openedMap, mapArray]);
    useEffect(() => {

    }, [selectData])
    const tabHandler = (e, data) => {
        setOpendMap(data);
        setMapArray(data);
        setSelectData(data);
        Handler(e);
    }

    const selectChangeHandler = (d) =>{
        setSelectData(d);
        setIsShow(true);
    }

    return (
        <div>
            <div className='container-fluid'>
                <Row className='main-container link-container'>
                    <Col ref={ref} className="text-center py-3 active" sm onClick={(e) => { tabHandler(e, oData) }}>
                        Total Trucks <br />
                        {oData?.length}
                    </Col>
                    <Col className="text-center py-3" sm onClick={(e) => { tabHandler(e, runningState) }} >
                        Running Trucks<br />
                        {runningState.length}
                    </Col>
                    <Col className="text-center py-3" sm onClick={(e) => { tabHandler(e, stoppedState) }}>
                        Stopped Trucks<br />
                        {stoppedState.length}
                    </Col>
                    <Col className="text-center py-3" sm onClick={(e) => { tabHandler(e, runningState) }}>
                        idle Truck<br />
                        {stoppedState.length}
                    </Col>
                    <Col className="text-center py-3" sm onClick={(e) => { tabHandler(e, stoppedState) }} >
                        Error Truck<br />
                        {runningState.length}
                    </Col>
                    <Col className="text-center py-3" sm >
                        <SearchSelect data={openedMap} updateMap={selectChangeHandler} />
                    </Col>
                </Row>
                <div>
                    <Row className='main-container '>
                        <Col xs={5} md={2} className='main-container left-scroll p-0 m-0'>
                            <input
                                className="search sticky-top mb-2 py-2"
                                type="search"
                                placeholder="Search trucks"
                                autoComplete="off"
                                onChange={ChangeHandler}
                            />
                            {(inputString ? (selectData.length ? selectData : openedMap).filter((item) => item.truckNumber.includes(inputString)) : selectData.length ? selectData : openedMap).map((d, i) => {
                                let endTime = moment(moment(new Date()));
                                var hourDiff = endTime.diff(d.lastRunningState.stopStartTime, 'hours');
                                
                                const since = hourDiff > 24 ? `${Math.round(hourDiff / 24)}d` : `${hourDiff}hr`;
                                return (
                                    <ListButton data={d} setMapArray={setMapArray} since={since} />
                                )
                            }
                            )}
                        </Col>
                        <Col xs={7} md={10} className='main-container height-map m-0 p-0'>
                            <Map data={selectData.length && isShow ? selectData : mapArray} />
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    )
}
