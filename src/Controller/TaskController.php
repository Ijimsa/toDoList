<?php

namespace App\Controller;
use App\Entity\Task;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use App\Repository\TaskRepository;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
#[Route('/api', name: 'app_task')]
class TaskController extends AbstractController
{
    #[Route('/task')]

    public function getTasks(TaskRepository $tr)
    { 
        $tasks = $tr->findAll();
        $jsonResponse=[];
        foreach($tasks as $task){
            $jsonResponse[]=[
                'id'=>$task->getId(),
                'title'=>$task->getText(),
                'date'=>$task->getDate(),
                'completed'=>$task->isCompleted(),
                'user'=>$task->getUser()->getName(),
                'importance'=>$task->getImportance()
            ];
        }
        return new JsonResponse($jsonResponse);
    }
    #[Route('/task/new', name: 'app_newTask') ]
    public function new(Request $request, EntityManagerInterface $em) :Response
    {
        //fetch the POST Data
        //$data = $request->request->all();
        $data = $request->getContent();
        $task = new Task();
        $task->setDate(new \DateTime());
        $task->setImportance($data['importance']);
        //$data es el array con lo enviado
        $task->setText();
        //$task->setUser($this->user);
        $task->setUser($this->getUser());
        $task->setCompleted(0);
      
        $em->persist($task);
        $em->flush();
        //return response
        
        $serializedEntity = $this->container->get('serializer')->serialize(serialize($task), 'json');
        $response = new Response($serializedEntity);
        $response->headers->set('Content-Type', 'application/json');
        return $response;
    }
}
