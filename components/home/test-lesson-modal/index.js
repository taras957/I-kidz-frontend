import React from 'react'
import {useTestLessonForm} from 'hooks/useTestLessonForm'

import Modal from 'components/common/modal/dialog'
import LessonForm from 'components/home/test-lesson-modal/form'
import CloseModalButton from 'components/common/modal/close-modal'
import {CloseIcon}  from 'images/custom-icons'

import css from './style.module.css'

const TestLesson = () => {
    const {post,isLoading,isSuccess}= useTestLessonForm()
    return (
        <Modal>
            <CloseModalButton>
            <button className={css['close']}>

                <CloseIcon/>
            </button>
            </CloseModalButton>
        <LessonForm onSubmit={post} isLoading={isLoading} isSuccess={isSuccess}  />
            
        </Modal>
    )
}

export default TestLesson
