import { Fragment, useState } from 'react'

import { Button } from 'primereact/button'
import { CONSTANTS } from '../../../global/constants'
import DataSettings from '../../overlays/body-data-settings'
import cn from 'classnames'
import styles from './styles.module.css'

export default function DataMenu({ dataSettings }) {
	const [displaySettings, setDisplaySettings] = useState(false)
	const [displayMenu, setDisplayMenu] = useState(false)

	const data = [
		{
			label: CONSTANTS.DCN,
			value: dataSettings.dailyCalorieNeed,
			unit: 'kcal',
		},
		{
			label: CONSTANTS.WEIGHT,
			value: dataSettings.weight.toFixed(2),
			unit: 'kg',
		},
		{
			label: CONSTANTS.FAT_RATIO,
			value: dataSettings.fatRatio.toFixed(2),
			unit: '%',
		},
		{ label: CONSTANTS.FITNESS_GOAL, value: dataSettings.fitnessGoal },
	]

	return (
		<Fragment>
			<div className={cn(styles.container, displayMenu ? styles.visible : null)}>
				{data.map(group => (
					<div className={styles.group} key={group.label}>
						<label>{group.label}:</label>
						<p>
							{group.value} {group.unit}
						</p>
					</div>
				))}
				<Button
					className={cn(styles.button, 'button')}
					icon='pi pi-fw pi-cog'
					onClick={() => setDisplaySettings(true)}
				/>
			</div>
			<div className={styles.toggle} onClick={() => setDisplayMenu(state => !state)}>
				<i className={displayMenu ? 'pi pi-angle-up' : 'pi pi-angle-down'} />
			</div>
			<DataSettings
				visible={displaySettings}
				onHide={setDisplaySettings.bind(null, false)}
				initialValues={dataSettings}
			/>
		</Fragment>
	)
}
